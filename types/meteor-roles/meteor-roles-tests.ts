import { Roles } from 'meteor/alanning:roles'


// $ExpectType string
Roles.GLOBAL_GROUP

// $ExpectType Subscription
Roles.subscription


/*** createRole tests ***/
// createRole without options
// $ExpectType string
Roles.createRole('createRole_singleParam')

// createRole with options
// $ExpectType string
Roles.createRole('createRole_doubleParam', { unlessExists: true })

/*** deleteRole tests ***/
// $ExpectType void
Roles.deleteRole('deleteRole')


/*** renameRole tests ***/
Roles.createRole('renameRole_originalName')
// $ExpectType void
Roles.renameRole('renameRole_originalName', 'renameRole_originalName_modified')


/*** addRolesToParent tests ***/
Roles.createRole('parentRole_addRolesToParent')
Roles.createRole('childRole_addRolesToParent')

// addRolesToParent first param string[]
// $ExpectType void
Roles.addRolesToParent(['childRole_addRolesToParent'], 'parentRole_addRolesToParent')

// addRolesToParent first param string
// $ExpectType void
Roles.addRolesToParent('childRole_addRolesToParent', 'parentRole_addRolesToParent')


/*** removeRolesFromParent tests ***/
Roles.createRole('parentRole_removeRolesFromParent')
Roles.createRole('childRole1_removeRolesFromParent')
Roles.createRole('childRole2_removeRolesFromParent')
Roles.addRolesToParent(
    ['childRole1_removeRolesFromParent', 'childRole2_removeRolesFromParent'], 'parentRole_removeRolesFromParent')

// removeRolesFromParent first param string[]
// $ExpectType void
Roles.removeRolesFromParent(['childRole1_removeRolesFromParent'], 'parentRole_removeRolesFromParent')

// removeRolesFromParent first param string
// $ExpectType void
Roles.removeRolesFromParent('childRole2_removeRolesFromParent', 'parentRole_removeRolesFromParent')


// Shared resource user for testing
const userId: string = Accounts.createUser({ username: 'user1', 'password': 'pass' })
const user: Meteor.User = Meteor.users.findOne({ _id: userId })


/*** addUsersToRoles tests ***/
Roles.createRole('addUsersToRoles')

// addUsersToRoles first param string; also tests second param string;
// $ExpectType void
Roles.addUsersToRoles(userId, 'addUsersToRoles')

// addUsersToRoles first param string[]
// $ExpectType void
Roles.addUsersToRoles([userId], 'addUsersToRoles')

// addUsersToRoles first param Object
// $ExpectType void
Roles.addUsersToRoles(user, 'addUsersToRoles')

// addUsersToRoles first param Object[]
// $ExpectType void
Roles.addUsersToRoles([user], 'addUsersToRoles')

// addUsersToRoles second param string[]
// $ExpectType void
Roles.addUsersToRoles(userId, ['addUsersToRoles'])

// addUsersToRoles third param string
// $ExpectType void
Roles.addUsersToRoles(userId, 'addUsersToRoles', 'scope_addUsersToRoles')

// addUsersToRoles third param Object
// $ExpectType void
Roles.addUsersToRoles(userId, 'role_does_not_exist', { ifExists: true })