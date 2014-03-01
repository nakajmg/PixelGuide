/*
 * jQuery.formData
 *
 * This program is licensed under the same terms as jQuery project itself.
 *
 * https://github.com/yuku-t/jquery-formdata
 */
$.fn.formData = function () {

    'use strict';

    if (!this[0] || this[0].tagName !== 'FORM') return {};

    var i, j, arr, name, value, ref, parts, part, last, isArray,
        data = this.serializeArray(),
        name_reg = /(\w+)|\[(\w*)\]/g,
        result = {};

    // Parse each input elements
    for (i = 0; i < data.length; i++) {
        name = data[i].name;
        value = data[i].value;
        parts = [];
        ref = result;

        while (true) {
            arr = name_reg.exec(name);
            if (!arr) break;
            parts.push(arr[1] || arr[2]);
        }

        // Whether the name attribute of current input elem ends with [].
        isArray = parts[parts.length - 1] === '';
        if (isArray) parts.pop();

        last = parts.pop();
        for (j = 0; j < parts.length; j++) {
            part = parts[j];
            if (!ref[part]) ref[part] = {};
            ref = ref[part];
        }

        if (isArray) {
            if (!ref[last]) ref[last] = [];
            ref[last].push(value);
        } else {
            ref[last] = value;
        }
    }
    return result;
};
