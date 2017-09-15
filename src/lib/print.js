(function(){

    const VERSION = '1.0.0';

    console.log(`Bass Station II Patch Sheet ${VERSION}`);

    const DEVICE = BS2;

    const URL_PARAM_SYSEX = 'sysex';    // name of sysex parameter in the query-string

    function renderGroup(group, changedonly) {
        var o = '';
        if (DEVICE.control_groups.hasOwnProperty(group)) {

            console.groupCollapsed('group', group, DEVICE.control_groups[group]);

            o = `<table id="${group}" class="values">\n`;

            //o += `<h2>${DEVICE.control_groups[group].name}</h2>`;

            // o += _p(DEVICE.control, DEVICE.control_groups[group].controls, 'control', changedonly);
            // o += _p(DEVICE.nrpn, DEVICE.control_groups[group].nrpns, 'nrpn', changedonly);

            // o += _p2(DEVICE.control_groups[group], changedonly);

            // let o = '';
            let g = DEVICE.control_groups[group];
            for (let i=0; i < g.controls.length; i++) {

                let c;
                let t = g.controls[i].type;
                let n = g.controls[i].number;
                if (t === 'cc') {
                    c = DEVICE.control[n];
                } else if (t === 'nrpn') {
                    c = DEVICE.nrpn[n];
                } else {
                    console.error(`invalid control type: ${g.controls[i].type}`)
                }

                // if (typeof c === 'undefined') continue;

                console.log(i, c);

                let v;  // = c.value;
                if (c.on_off) {
                    v = c.value == 0 ? 'off' : 'on';
                } else {

                    v = c.human(c.raw_value);
                    console.log(`${t} ${n} raw=${c.raw_value} h=${v}`);
                }

                if (changedonly && !c.changed()) continue;

                let bold = !changedonly && c.changed() ? 'style="font-weight:bold"' : '';

                o += `<tr id="${t}-${n}" title="${c.name}"><td ${bold}>${c.name}</td><td ${bold}>${v}</td></tr>\n`;

            }
            // $('#sheet').append(`</table>`);
            // o += `</table>`;
            // $('#sheet').append(o);
            // return o;


            o += `</table>\n`;

            console.groupEnd();

        }
        return o;
    }

    function renderPatch(template, changedonly) {

        console.log('renderPatch');

        let values_link;
        if (changedonly) {
            values_link = '<a href="#" id="all-values">Show all values</a>';
        } else {
            values_link = '<a href="#" id="only-changed">Show only the changed values from an init patch</a>';
        }

        $('body').append(`<div id="cmds"><a href="#" id="print">PRINT</a><br />${values_link}</div>`);

        let s = `<h1>Bass Station II Patch <span id="patch-number">${DEVICE.meta.patch_id.value}</span> <span id="patch-name">${DEVICE.meta.patch_name.value}</span></h1>`;
        $('body').append(s);

        // $('body').append('');

        var t = $(template).filter('#template-main').html();
        var p = {
            "name": "Tater",
            "v": function () {
                return function (text, render) {
                    return renderGroup(text.trim().toLowerCase(), changedonly);
                }
            }
        };
        var o = Mustache.render(t, p);
        $('body').append(o);

        $("#all-values").click(function(){
            window.location = window.location.href.replace(/&changedonly[^&]*/g, '') + "&changedonly=0";
        });

        $("#only-changed").click(function(){
            window.location = window.location.href.replace(/&changedonly[^&]*/g, '') + "&changedonly=1";
        });

        $("#print").click(function(){
            window.print();
            return false;
        });
    }

    function loadTemplate(data, changedonly) {

        console.log('loadTemplate', data);

        $.get('templates/patch-sheet-template.html', function(template) {
            console.log('patch-sheet-template.html loaded');
            let d = null;
            if (data) {

                console.log('loadTemplate: read sysex data');

                for (let i=0; i<data.length; i++) {
                    if (data[i] === 240) {
                        console.log('start sysex');
                        if (d) {
                            if (DEVICE.setValuesFromSysex(d)) {
                                console.log('device updated from sysex');
                                renderPatch(template, changedonly);
                            } else {
                                console.log('unable to update device from sysex');
                            }
                        }
                        console.log('clear d', data[i]);
                        d = [];
                    }
                    // console.log('push ', data[i]);
                    d.push(data[i]);
                }
            }
            if (d) {

                console.log('loadTemplate: set values from sysex data');

                if (DEVICE.setValuesFromSysex(d)) {
                    console.log('device updated from sysex');
                    renderPatch(template, changedonly);
                } else {
                    console.log('unable to update device from sysex');
                }
            }
            renderPatch(template, changedonly);
        });
    }



    $(function () {

        DEVICE.init();

        let data = null;

        let s = Utils.getParameterByName(URL_PARAM_SYSEX);
        if (s) {
            data = Utils.fromHexString(s);
            DEVICE.setValuesFromSysex(data);
        } else {
            s = Utils.getParameterByName('pack');
            if (s) {
                data = msgpack.decode(base64js.toByteArray(s));
                if (data) {
                    DEVICE.setAllValues(data);
                }
            }
        }

        let changedonly = Utils.getParameterByName('changedonly') === '1';

        loadTemplate(null, changedonly);

    });

})();