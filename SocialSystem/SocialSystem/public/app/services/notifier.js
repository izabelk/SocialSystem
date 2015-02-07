'use strict';

app.factory('notifier', ['toastr', function (toastr) {
    return {
        success: function (msg) {
            toastr.success(msg);
        },
        error: function (msg) {
            toastr.error(msg);
        },
        info: function (msg) {
            toastr.info(msg);
        },
        warning: function (msg) {
            toastr.warning(msg);
        }
    }
}]);