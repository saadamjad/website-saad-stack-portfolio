/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1943785162");
  collection.viewRule = "@request.auth.id != \"\"";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1943785162");
  collection.viewRule = "";
  return app.save(collection);
})
