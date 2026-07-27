/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text4895624064",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text2210983301",
        "name": "session_id",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 64,
        "min": 0,
        "pattern": "^[0-9a-fA-F-]{36}$"
      },
      {
        "hidden": false,
        "id": "select3402910442",
        "maxSelect": 1,
        "name": "role",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": ["user", "assistant"]
      },
      {
        "hidden": false,
        "id": "text8817203451",
        "name": "content",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 4000,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text1029384756",
        "name": "event_id",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 128,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "number5567281940",
        "name": "seq",
        "onlyInt": false,
        "presentable": false,
        "required": true,
        "system": false,
        "type": "number",
        "max": null,
        "min": null
      },
      {
        "hidden": false,
        "id": "autodate2245961148",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate0206595700",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_2894017733",
    "indexes": [
      "CREATE INDEX `idx_chat_messages_session_seq` ON `chat_messages` (`session_id`, `seq`)"
    ],
    "listRule": null,
    "name": "chat_messages",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) {
      console.log("Collection already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_2894017733");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
