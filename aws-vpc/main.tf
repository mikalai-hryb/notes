variable "key_name" {
  default = "aws-vpc"
}

resource "aws_instance" "web-instance" {
  for_each = {
    "public" = null,
    # "private" = "subnet-0b986e04f9b9d986c",
    "private" = null
  }
  ami                    = "ami-0c6da69dd16f45f72" // al2023-ami-2023.5.20240903.0-kernel-6.1-x86_64
  instance_type          = "t3.micro"
  key_name               = aws_key_pair.aws_vpc.key_name
  user_data              = <<-USERDATA
    #!/usr/bin/env bash
    %{ if each.value == null ~}
    sudo yum install httpd -y
    sudo systemctl start httpd
    sudo systemctl enable httpd
    echo "<h1>Terraform Instance Launched Successfully</h1>" | sudo tee /var/www/html/index.html
    %{ else ~}
    sudo adduser newuser
    %{ endif ~}
  USERDATA
  vpc_security_group_ids = ["${aws_security_group.web.id}"]
  subnet_id = each.value
  tags = {
    Name = each.key
  }
}

resource "aws_security_group" "web" {
  name        = "web"
  description = "Allow ssh inbound traffic"
  vpc_id      = "vpc-00eebb8ad1c40d7a5"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["178.235.54.236/32"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["178.235.54.236/32"]
    self = true
  }

    ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["178.235.54.236/32"]
    self = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "aws_vpc" {
  key_name   = var.key_name
  public_key = file("${path.module}/id_ed25519.pub")
}

output "name" {
  value = aws_key_pair.aws_vpc.arn
  sensitive = true
}
