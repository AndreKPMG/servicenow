;(function () {
    data.title = options.title || 'Land Acquisition'
    data.subtitle =
        options.subtitle ||
        'Submit and track draft project proposals for the acquisition of land for renewable energy generation.'
    data.eyebrow = options.eyebrow || 'Renewable development pipeline'

    data.stats = { drafts: 0, submitted: 0, hectares: 0 }

    var byState = new GlideAggregate('x_kpm95_claudecode_land_draft')
    byState.addAggregate('COUNT', 'state')
    byState.query()
    while (byState.next()) {
        var state = byState.getValue('state')
        var count = parseInt(byState.getAggregate('COUNT', 'state'), 10) || 0
        if (state === 'draft') {
            data.stats.drafts = count
        } else if (state === 'submitted' || state === 'in_review') {
            data.stats.submitted += count
        }
    }

    var area = new GlideAggregate('x_kpm95_claudecode_land_draft')
    area.addAggregate('SUM', 'area_hectares')
    area.query()
    if (area.next()) {
        data.stats.hectares = Math.round(parseFloat(area.getAggregate('SUM', 'area_hectares') || 0))
    }
})()
