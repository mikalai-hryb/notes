# AWS IAM - Identity and Access Management

## What is Principal in policy?

An account or an user to apply the policy to.

## What is Service Role and what does it look like?

It has only `Effect`, `Action` and `Resource` keys.
In the

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ]
    },
  ]
}
```

in the `Trust Relationships` tab you can find something like that

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "s3.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```
