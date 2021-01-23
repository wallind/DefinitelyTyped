// Type definitions for Meteor Roles 1.2.14
// Project: https://github.com/alanning/meteor-roles/
// Definitions by: Robbie Van Gorkom <https://github.com/vangorra>
//                 Matthew Zartman <https://github.com/mattmm3d>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.7

/// <reference types="meteor" />

interface Role {
    name: string;
}

declare namespace Meteor {
    var roles: Mongo.Collection<Role>;
}

/* Declaring in the format prescribed by Meteor */
declare module "meteor/alanning:roles" {

    /**
     * Provides functions related to user authorization. Compatible with built-in Meteor accounts packages.
     *
     * It uses `roles` field to `Meteor.users` documents which is an array of subdocuments with the following
     * schema:
     *  - `_id`: role name
     *  - `scope`: scope name
     *  - `assigned`: boolean, if the role was manually assigned (set), or was automatically inferred (eg., subroles)
     *
     * Roles themselves are accessible throgh `Meteor.roles` collection and documents consist of:
     *  - `_id`: role name
     *  - `children`: list of subdocuments:
     *    - `_id`
     *
     * Children list elements are subdocuments so that they can be easier extended in the future or by plugins.
     *
     * Roles can have multiple parents and can be children (subroles) of multiple roles.
     *
     * Example: `{_id: 'admin', children: [{_id: 'editor'}]}`
     *
     * @module Roles
     */
    namespace Roles {
        /**
         * Used as a global group (now scope) name. Not used anymore.
         *
         * @property GLOBAL_GROUP
         * @static
         * @deprecated
         */
        var GLOBAL_GROUP: string;

        /**
         * Subscription handle for the collection of all existing roles.
         *
         * @example
         *
         *     Roles.subscription.ready(); // true if roles have been loaded
         *
         * @property subscription
         * @type Object
         * @for Roles
         * @static
         */
        var subscription: Subscription;

        /**
         * Create a new role.
         *
         * @method createRole
         * @param {String} roleName Name of role.
         * @param {Object} [options] Options:
         *   - `unlessExists`: if `true`, exception will not be thrown in the role already exists
         * @return {String} ID of the new role.
         * @static
         */
        function createRole(role: string, options?: Object): string;

        /**
         * Delete an existing role.
         *
         * If the role is set for any user, it is automatically unset.
         *
         * @method deleteRole
         * @param {String} roleName Name of role.
         * @static
         */
        function deleteRole(role: string): void;

        /**
         * Rename an existing role.
         *
         * @method renameRole
         * @param {String} oldName Old name of a role.
         * @param {String} newName New name of a role.
         * @static
         */
        function renameRole(oldName: string, newName: string): void;

        /**
         * Add role parent to roles.
         *
         * Previous parents are kept (role can have multiple parents). For users which have the
         * parent role set, new subroles are added automatically.
         *
         * @method addRolesToParent
         * @param {Array|String} rolesNames Name(s) of role(s).
         * @param {String} parentName Name of parent role.
         * @static
         */
        function addRolesToParent(rolesNames: string[] | string, parentName: string): void;

        /**
         * Remove role parent from roles.
         *
         * Other parents are kept (role can have multiple parents). For users which have the
         * parent role set, removed subrole is removed automatically.
         *
         * @method removeRolesFromParent
         * @param {Array|String} rolesNames Name(s) of role(s).
         * @param {String} parentName Name of parent role.
         * @static
         */
        function removeRolesFromParent(rolesNames: string[] | string, parentName: string): void;

        /**
         * Add users to roles.
         *
         * Adds roles to existing roles for each user.
         *
         * @example
         *     Roles.addUsersToRoles(userId, 'admin')
         *     Roles.addUsersToRoles(userId, ['view-secrets'], 'example.com')
         *     Roles.addUsersToRoles([user1, user2], ['user','editor'])
         *     Roles.addUsersToRoles([user1, user2], ['glorious-admin', 'perform-action'], 'example.org')
         *
         * @method addUsersToRoles
         * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
         * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of the scope, or `null` for the global role
         *   - `ifExists`: if `true`, do not throw an exception if the role does not exist
         *
         * Alternatively, it can be a scope name string.
         * @static
         */
        function addUsersToRoles(
            user: string | string[] | Object | Object[],
            roles: string | string[],
            options?: Object | string
        ): void;

        /**
         * Set users' roles.
         *
         * Replaces all existing roles with a new set of roles.
         *
         * @example
         *     Roles.setUserRoles(userId, 'admin')
         *     Roles.setUserRoles(userId, ['view-secrets'], 'example.com')
         *     Roles.setUserRoles([user1, user2], ['user','editor'])
         *     Roles.setUserRoles([user1, user2], ['glorious-admin', 'perform-action'], 'example.org')
         *
         * @method setUserRoles
         * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
         * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of the scope, or `null` for the global role
         *   - `ifExists`: if `true`, do not throw an exception if the role does not exist
         *
         * Alternatively, it can be a scope name string.
         * @static
         */
        function setUserRoles(
            user: string | string[] | Object | Object[],
            roles: string | string[],
            options?: Object | string
        ): void;

        /**
         * Remove users from assigned roles.
         *
         * @example
         *     Roles.removeUsersFromRoles(userId, 'admin')
         *     Roles.removeUsersFromRoles([userId, user2], ['editor'])
         *     Roles.removeUsersFromRoles(userId, ['user'], 'group1')
         *
         * @method removeUsersFromRoles
         * @param {Array|String} users User ID(s) or object(s) with an `_id` field.
         * @param {Array|String} roles Name(s) of roles to add users to. Roles have to exist.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of the scope, or `null` for the global role
         *
         * Alternatively, it can be a scope name string.
         * @static
         */
        function removeUsersFromRoles(
            user: string | string[] | Object | Object[],
            roles?: string[],
            options?: Object | string
        ): void;

        /**
         * Check if user has specified roles.
         *
         * @example
         *     // global roles
         *     Roles.userIsInRole(user, 'admin')
         *     Roles.userIsInRole(user, ['admin','editor'])
         *     Roles.userIsInRole(userId, 'admin')
         *     Roles.userIsInRole(userId, ['admin','editor'])
         *
         *     // scope roles (global roles are still checked)
         *     Roles.userIsInRole(user, 'admin', 'group1')
         *     Roles.userIsInRole(userId, ['admin','editor'], 'group1')
         *     Roles.userIsInRole(userId, ['admin','editor'], {scope: 'group1'})
         *
         * @method userIsInRole
         * @param {String|Object} user User ID or an actual user object.
         * @param {Array|String} roles Name of role or an array of roles to check against. If array,
         *                             will return `true` if user is in _any_ role.
         *                             Roles do not have to exist.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of the scope; if supplied, limits check to just that scope
         *     the user's global roles will always be checked whether scope is specified or not
         *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
         *
         * Alternatively, it can be a scope name string.
         * @return {Boolean} `true` if user is in _any_ of the target roles
         * @static
         */
        function userIsInRole(
            user: string | Object,
            roles: string | string[],
            options?: Object | string
        ): boolean;

        /**
         * Retrieve user's roles.
         *
         * @method getRolesForUser
         * @param {String|Object} user User ID or an actual user object.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of scope to provide roles for; if not specified, global roles are returned
         *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
         *   - `fullObjects`: return full roles objects (`true`) or just names (`false`) (default `false`)
         *   - `onlyAssigned`: return only assigned roles and not automatically inferred (like subroles)
         *
         * Alternatively, it can be a scope name string.
         * @return {Array} Array of user's roles, unsorted.
         * @static
         */
        function getRolesForUser(
            user: string | Object,
            options?: Object | string
        ): string[];

        /**
         * Retrieve cursor of all existing roles.
         *
         * @method getAllRoles
         * @param {Object} [queryOptions] Options which are passed directly
         *                                through to `Meteor.roles.find(query, options)`.
         * @return {Cursor} Cursor of existing roles.
         * @static
         */
        function getAllRoles(queryOptions?: Object): Mongo.Cursor<Role>;

        /**
         * Retrieve all users who are in target role.
         *
         * Options:
         *
         * @method getUsersInRole
         * @param {Array|String} roles Name of role or an array of roles. If array, users
         *                             returned will have at least one of the roles
         *                             specified but need not have _all_ roles.
         *                             Roles do not have to exist.
         * @param {Object|String} [options] Options:
         *   - `scope`: name of the scope to restrict roles to; user's global
         *     roles will also be checked
         *   - `anyScope`: if set, role can be in any scope (`scope` option is ignored)
         *   - `queryOptions`: options which are passed directly
         *     through to `Meteor.users.find(query, options)`
         *
         * Alternatively, it can be a scope name string.
         * @param {Object} [queryOptions] Options which are passed directly
         *                                through to `Meteor.users.find(query, options)`
         * @return {Cursor} Cursor of users in roles.
         * @static
         */
        function getUsersInRole(
            role: string | string[],
            options?: Object | string,
            queryOptions?: {
                sort?: Mongo.SortSpecifier;
                skip?: number;
                limit?: number;
                fields?: Mongo.FieldSpecifier;
                reactive?: boolean;
                transform?: Function;
            }): Mongo.Cursor<Meteor.User>;

        /**
         * Deprecated. Use `getScopesForUser` instead.
         *
         * @method getGroupsForUser
         * @static
         * @deprecated
         */
        function getGroupsForUser(
            user: string | Object,
            role?: string
        ): string[];

        /**
         * Retrieve users scopes, if any.
         *
         * @method getScopesForUser
         * @param {String|Object} user User ID or an actual user object.
         * @param {Array|String} [roles] Name of roles to restrict scopes to.
         *
         * @return {Array} Array of user's scopes, unsorted.
         * @static
         */
        function getScopesForUser(user: string | Object, roles?: string[] | string): string[];

        /**
         * Rename a scope.
         *
         * Roles assigned with a given scope are changed to be under the new scope.
         *
         * @method renameScope
         * @param {String} oldName Old name of a scope.
         * @param {String} newName New name of a scope.
         * @static
         */
        function renameScope(oldName: string, newName: string): void;


        /**
         * Remove a scope.
         *
         * Roles assigned with a given scope are removed.
         *
         * @method removeScope
         * @param {String} name The name of a scope.
         * @static
         */
        function removeScope(name: string): void;

        /**
         * Find out if a role is an ancestor of another role.
         *
         * WARNING: If you check this on the client, please make sure all roles are published.
         *
         * @method isParentOf
         * @param {String} parentRoleName The role you want to research.
         * @param {String} childRoleName The role you expect to be among the children of parentRoleName.
         * @static
         */
        function isParentOf(parentRoleName: string, childRoleName: string): boolean;
    }
}
