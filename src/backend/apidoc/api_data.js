define({ "api": [
  {
    "type": "post",
    "url": "/user/login",
    "title": "Login access for customer",
    "name": "Login",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/user/logout",
    "title": "Logout access for customer",
    "name": "Logout",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  }
] });
