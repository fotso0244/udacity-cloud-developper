export const config = {
  
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE
  },
  "jwt": {
    "secret": process.env.JWT_SECRET,
  }
}
