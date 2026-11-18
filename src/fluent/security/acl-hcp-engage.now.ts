import { Acl } from '@servicenow/sdk/core'
import { chatdemoAdmin } from './roles.now'

// Stessi quattro percorsi di lettura della tabella acquisti, applicati agli engagement HCx.

Acl({
    $id: Now.ID['acl_hcp_read_admin'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'read',
    active: true,
    description: 'Lettura engagement HCx: amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_hcp_read_opened_by'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'read',
    active: true,
    description: 'Lettura engagement HCx: chi ha aperto il record.',
    script: `answer = false;
if (current && !current.sys_id.nil()) {
    answer = current.opened_by.toString() === gs.getUserID();
}`,
})

Acl({
    $id: Now.ID['acl_hcp_read_approver'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'read',
    active: true,
    description: 'Lettura engagement HCx: approvatore del record.',
    script: `answer = false;
if (current && !current.sys_id.nil()) {
    var appr = new GlideRecord('sysapproval_approver');
    appr.addQuery('sysapproval', current.sys_id.toString());
    appr.addQuery('approver', gs.getUserID());
    appr.setLimit(1);
    appr.query();
    answer = appr.hasNext();
}`,
})

Acl({
    $id: Now.ID['acl_hcp_read_delegate'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'read',
    active: true,
    description: 'Lettura engagement HCx: delegato attivo di un approvatore, con approvals=true.',
    script: `answer = false;
if (current && !current.sys_id.nil()) {
    var nowStr = new GlideDateTime().getValue();
    var principals = [];
    var del = new GlideRecord('sys_user_delegate');
    del.addQuery('delegate', gs.getUserID());
    del.addQuery('approvals', true);
    del.setLimit(100);
    del.query();
    while (del.next()) {
        var starts = del.getValue('starts');
        var ends = del.getValue('ends');
        var okStart = !starts || starts <= nowStr;
        var okEnd = !ends || ends >= nowStr;
        if (okStart && okEnd) {
            principals.push(del.getValue('user'));
        }
    }
    if (principals.length > 0) {
        var appr = new GlideRecord('sysapproval_approver');
        appr.addQuery('sysapproval', current.sys_id.toString());
        appr.addQuery('approver', 'IN', principals.join(','));
        appr.setLimit(1);
        appr.query();
        answer = appr.hasNext();
    }
}`,
})

Acl({
    $id: Now.ID['acl_hcp_write'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'write',
    active: true,
    description: 'Scrittura engagement HCx: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_hcp_create'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'create',
    active: true,
    description: 'Creazione engagement HCx: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_hcp_delete'],
    type: 'record',
    table: 'x_kpm95_chatdemo_hcp_engage',
    operation: 'delete',
    active: true,
    description: 'Cancellazione engagement HCx: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})
