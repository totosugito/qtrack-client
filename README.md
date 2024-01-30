## Component

| From                                 | Container                     | To                   | Status | Desc                          |
|--------------------------------------|-------------------------------|----------------------|--------|-------------------------------|
| Background                           |                               |
| Board                                | BoardContainer                |                      |
| BoardActions                         | BoardActionsContainer         |                      |
| BoardMembershipPermissionsSelectStep |                               |
| BoardMembershipsStep                 |                               |
| Boards                               | BoardsContainer               |                      |
| Card                                 | CardContainer                 |                      |
| CardModal                            | CardModalContainer            |                      |
| CardMoveStep                         |                               |                      |
| Core                                 | CoreContainer                 |                      |
| DeleteStep                           |                               | view                 | ✔      | delete dialog                 |
| DueDate                              |                               |
| DueDateEditStep                      |                               |
| Fixed                                | FixedContainer                |                      |
| Header                               | HeaderContainer               | page/base-auth       | ✔      | auth toolbar                  |
| Label                                |                               |
| LabelsStep                           |                               |                      |
| List                                 | ListContainer                 |                      |
| Login                                | LoginContainer                |                      |
| Memberships                          |                               |
| Project                              | ProjectContainer              |                      |
| ProjectAddModal                      | ProjectAddModalContainer      |                      |
| Projects                             | ProjectsContainer             | page/ui-project-list | ✔      | list of projects              |
| ProjectSettingsModal                 | ProjectSettingsModalContainer |                      |
| Static                               | StaticContainer               |                      |
| Stopwatch                            |                               |
| StopwatchEditStep                    |                               |
| User                                 |                               | view                 | ✔      |                               |
| UserAddStep                          | UserAddStepContainer          | view                 | ✔      | dialog members create         |
| UserEmailEditStep                    |                               | view                 | ✔      | dialog members edit email     |
| UserInformationEdit                  |                               | view                 | ✔      | dialog members edit user info |
| UserPasswordEditStep                 |                               | view                 | ✔      | dialog members edit password  |
| UserSettingsModal                    | UserSettingsModalContainer    | view                 | ✔      | dialog user settings          |
| UsersModal                           | UsersModal                    | view                 | ✔      | dialog project members        |
| UserStep                             |                               | page/base-auth       | ✔      | toolbar user menu             |
| UserUsernameEditStep                 |                               | view                 | ✔      | dialog members edit username  |

# Planka client

scp -r -P 23 build/* waviv@117.54.250.85:/var/www/html/qtrack

# server survey

scp -r -P 24 build/* reska@117.54.250.82:/var/www/html/qtrack
