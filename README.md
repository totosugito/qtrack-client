## Component
| From                                 | To              | Status | Desc              |
|--------------------------------------|-----------------|--------|-------------------|
| Background                           |                 |
| Board                                |                 |
| BoardActions                         |                 |
| BoardMembershipPermissionsSelectStep |                 |
| BoardMembershipsStep                 |                 |
| Boards                               |                 |
| Card                                 |                 |
| CardModal                            |                 |
| CardMoveStep                         |                 |
| Core                                 |                 |
| DeleteStep                           |                 |
| DueDate                              |                 |
| DueDateEditStep                      |                 |
| Fixed                                |                 |
| Header                               | base-auth       | ✔      | auth toolbar      |
| Label                                |                 |
| LabelsStep                           |                 |        |
| List                                 |                 |
| Login                                |                 |
| Memberships                          |                 |
| Project                              |                 |
| ProjectAddModal                      |                 |
| Projects                             | ui-project-list | ✔      | list of projects  |
| ProjectSettingsModal                 |                 |
| Static                               |                 |
| Stopwatch                            |                 |
| StopwatchEditStep                    |                 |
| User                                 |                 |
| UserAddStep                          |                 |
| UserEmailEditStep                    |                 |
| UserInformationEdit                  |                 |
| UserPasswordEditStep                 |                 |
| UserSettingsModal                    |                 |
| UsersModal                           |                 |
| UserStep                             | base-auth       | ✔      | toolbar user menu |
| UserUsernameEditStep                 |                 |

# Planka client
scp -r -P 23 build/* waviv@117.54.250.85:/var/www/html/qtrack

# server survey
scp -r -P 24 build/* reska@117.54.250.82:/var/www/html/qtrack
