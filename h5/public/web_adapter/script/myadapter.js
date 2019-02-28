
function apiadapter(payload) {
  var moduleName = payload.moduleName;
  var method = payload.method;
  var isSync = payload.isSync;
  var params = payload.params;
  var cbId = payload.cbId;
  var callback = payload.callback;
  var frameDom = payload.frameDom;
  var winDom = payload.winDom;
  var apiDom = payload.apiDom;

  if (moduleName === 'db') {
    if (method === 'openDatabase') {
      callback(cbId, { status: true }, null, true);

      return;
    }

    if (method === 'executeSql') {
      var _ret = (function () {
        var name = params.name;
        var sql = params.sql;

        var db = openDatabase(name, '1.0', 'APICloud App Database', 2 * 1024 * 1024);
        db.transaction(function (ctx) {
          ctx.executeSql(sql, [], function (ctx, result) {
            callback(cbId, { status: true }, null, true);
          }, function (ctx, error) {
            callback(cbId, { status: false }, { msg: error && error.message }, true);
          });
        });

        return {
          v: undefined
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }

    if (method === 'selectSql') {
      var _ret2 = (function () {
        var name = params.name;
        var sql = params.sql;

        var db = openDatabase(name, '1.0', 'APICloud App Database', 2 * 1024 * 1024);

        db.transaction(function (ctx) {
          ctx.executeSql(sql, [], function (ctx, result) {
            var len = result.rows.length;
            var data = [];

            for (var i = 0; i < len; i++) {
              data.push(result.rows.item(i));
            }

            callback(cbId, { status: true, data: data }, null, true);
          }, function (ctx, error) {
            callback(cbId, { status: false }, { msg: error && error.message });
          });
        });

        return {
          v: undefined
        };
      })();

      if (typeof _ret2 === 'object') return _ret2.v;
    }
  }

  return 'TO_NEXT_API_ADAPTER';
}