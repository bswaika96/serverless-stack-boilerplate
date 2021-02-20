# serverless-stack-boilerplate

> Note: Make sure to add some custom identifier for every storage bucket since its globally name-spaced across AWS.

1. `git clone [https://github.com/bswaika96/serverless-stack-boilerplate.git](https://github.com/bswaika96/serverless-stack-boilerplate.git)`
2. Create user on your AWS IAM and give `AdministratorAccess` (save credentials somewhere safe)
3. Create/login serverless dashboard account
4. Create APP → Serverless Framework → Enter App name and Service name
5. `nvm use 12`
6. `yarn add global serverless`
7. `sls login`
8. `cd infra`
9. Change `org:` in serverless.yaml to the one you are in in serverless dashboard
10. `sls deploy --stage prod`
11. `cd ../source/services`
12. For each service `cd {service_name}` and `sls deploy`
13. `cd ../../docs && sls deploy`

### Done!

### Variables to change after setup:

`source>services>users>serverless.yaml`

→ `org:`

`docs>serverless.yaml`

→ `org:`

> Note: Needs to changed for every service

> Note: Use `npm install` in every directory where there is `package.json`
