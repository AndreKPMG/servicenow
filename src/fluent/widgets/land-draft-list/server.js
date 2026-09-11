;(function () {
    var TABLE = 'x_kpm95_claudecode_land_draft'
    var maxRecords = parseInt(options.max_records, 10) || 8

    data.drafts = []

    var gr = new GlideRecord(TABLE)
    gr.addQuery('submitted_by', gs.getUserID())
    gr.orderByDesc('sys_created_on')
    gr.setLimit(maxRecords)
    gr.query()

    while (gr.next()) {
        data.drafts.push({
            sysId: gr.getUniqueValue(),
            projectName: gr.getValue('project_name'),
            energyType: gr.getDisplayValue('energy_type'),
            state: gr.getValue('state'),
            stateLabel: gr.getDisplayValue('state'),
            municipality: gr.getValue('municipality'),
            region: gr.getValue('region'),
            area: gr.getValue('area_hectares'),
            capacity: gr.getValue('estimated_capacity_mw'),
            created: gr.getDisplayValue('sys_created_on'),
        })
    }
})()
