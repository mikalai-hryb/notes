locals {
  git_repo_root = "${path.root}/.."
  base_name     = "test-ansible"
  tracked_files = setunion(
    fileset(local.git_repo_root, "docker/*"),
  )
  dir_sha1 = sha1(join("",
    [for f in local.tracked_files : filesha1("${local.git_repo_root}/${f}")]
  ))
  tagged_image_name = "${local.base_name}:${local.dir_sha1}"
}

# build image locally
resource "docker_image" "this" {
  name = local.base_name
  build {
    context    = local.git_repo_root
    dockerfile = "${local.git_repo_root}/docker/Dockerfile"
    tag        = [local.tagged_image_name, "${local.base_name}:latest"]
  }

  # rebuild the docker image only if application files have changed
  triggers = {
    dir_sha1 = local.dir_sha1
  }
}

locals {
  number_of_containers = range(2, 7)
  containers           = { for i in local.number_of_containers : "ip${i}" => i }
}

resource "docker_container" "this" {
  for_each = local.containers

  name         = "${local.base_name}-${each.value}"
  image        = docker_image.this.image_id
  network_mode = "bridge"
  ports {
    internal = 80
    external = 8080 + each.value
  }

  ports {
    internal = 443
    external = 8443 + each.value
  }

  # ports {
  #   internal = 22
  #   external = 22
  # }
}

data "template_file" "ini" {
  template = file("${path.module}/inventory.ini.tpl")
  vars     = { for k, v in docker_container.this : k => v.network_data[0].ip_address }

}

resource "local_file" "ini" {
  content  = data.template_file.ini.rendered
  filename = "${path.module}/../inventory/inventory.ini"
}

output "containers" {
  value = { for k, v in docker_container.this : k => v.network_data[0].ip_address }
}
