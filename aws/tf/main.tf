locals {
  base_name = "my-ec2"
}

data "aws_ssm_parameter" "ec2_ami_id" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-minimal-kernel-6.1-x86_64"
}

data "aws_vpc" "default" {
  id = "vpc-00eebb8ad1c40d7a5"
}

resource "aws_security_group" "ec2" {
  name_prefix = "ec2-sg-"
  description = "Security group for EC2 instances."
  vpc_id      = data.aws_vpc.default.id
}

resource "aws_security_group_rule" "ec2_ingress_allow_lb" {
  security_group_id = aws_security_group.ec2.id
  description       = "Allow EC2 to accept traffic from SSH."
  type              = "ingress"
  protocol          = "TCP"
  to_port           = 22
  from_port         = 22
  #   cidr_blocks = ["178.235.54.236/32"]
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ec2_egress_allow_all" {
  security_group_id = aws_security_group.ec2.id
  description       = "Allow all outbound traffic."
  type              = "egress"
  protocol          = "ALL"
  to_port           = 0
  from_port         = 0
  cidr_blocks       = ["0.0.0.0/0"]
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_instance" "this" {
  ami                    = data.aws_ssm_parameter.ec2_ami_id.value
  instance_type          = "t3.micro"
  iam_instance_profile   = aws_iam_instance_profile.ec2.name
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.ec2.id]
  key_name               = "me"

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update
    sudo yum install docker -y
    sudo usermod -a -G docker ec2-user
    id ec2-user
    sudo newgrp docker
    sudo systemctl enable docker.service
    sudo systemctl start docker.service
  EOF
}

data "aws_iam_policy_document" "ec2" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "instance_connect" {
  statement {
    actions   = ["ec2-instance-connect:SendSSHPublicKey"]
    effect    = "Allow"
    resources = ["arn:aws:ec2:::instance/*"]
  }
    statement {
    actions   = ["ec2:DescribeInstances", "ec2:DescribeVpcs"]
    effect    = "Allow"
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "instance_connect" {
    name = "instance-connect"
    role = aws_iam_role.ec2.name
    policy = data.aws_iam_policy_document.instance_connect.json

}

resource "aws_iam_role" "ec2" {
  name_prefix        = "${local.base_name}-ec2"
  assume_role_policy = data.aws_iam_policy_document.ec2.json
}

resource "aws_iam_role_policy_attachment" "ec2_AmazonEC2ContainerRegistryPullOnly" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPullOnly"
}

# manages SSM agent which allows AWS Console connection
resource "aws_iam_role_policy_attachment" "ssm_AmazonSSMFullAccess" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
}

resource "aws_iam_role_policy_attachment" "ssm_AmazonS3ReadOnlyAccess" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

resource "aws_iam_instance_profile" "ec2" {
  name_prefix = "${local.base_name}-ec2"
  path        = "/ec2/instance/"
  role        = aws_iam_role.ec2.name
}
