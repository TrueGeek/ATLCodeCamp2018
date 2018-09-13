# ATLCodeCamp2018
Code for my ATL Code Camp 2018 (and GGMUG!) talk

This is the finished code for the project created in the [ATL Code Camp talk](https://www.atlantacodecamp.com/2018/Speakers/Bradley-Dean) on React Native User Authentication with Amazon AWS Cognito. The [same talk was given at GGMUG](https://www.meetup.com/Gwinnett-Microsoft-Users-Group/events/253453065/) a few days prior.

In order to run the code you'll need to sign up for AWS and create a Cognito User Pool. The User Pool Id and App Id will need to be put into Loading.js.

I hope you had fun. Feel free to contact me if you need any help.

---

## AWS Setup

* Go to [Amazon Cognito](https://console.aws.amazon.com/cognito/home)
* Click `Manage User Pools`
* Click `Create a user pool`
* For the `Pool name` enter '`UserPool`'
* Click `Step through settings`
* Change the sign in option to `Allow email address` and click `Next step`
* Uncheck all four `Require` boxes and click `Next step`
* Leave MFA as defaults and click `Next step`
* Personalize the `Email subject` and `Email message` and click `Next step`
* Leave the Tags blank and click `Next step`
* Leave the devices as defaults and click `Next step`
* For `App clients` click `Add an app client`
  * App client name: '`{Your App} Mobile`'
  * Uncheck `Generate client secret`
  * Click `Create app client` and then `Next step`
* Leave the `Triggers` as defaults and click `Next step`
* Create `Create pool`
