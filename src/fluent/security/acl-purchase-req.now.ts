import { Acl } from '@servicenow/sdk/core'
import { chatdemoAdmin } from './roles.now'

// Lettura: una ACL separata per ogni percorso di accesso previsto
// (admin, opened_by, approvatore del record, delegato attivo con approvals=true).
// Le ACL dello stesso livello sono in OR: basta che una conceda.
// Scrittura: solo admin.

Acl({
    $id: Now.ID['acl_purchase_read_admin'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'read',
    active: true,
    description: 'Lettura richieste di acquisto: amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_purchase_read_opened_by'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'read',
    active: true,
    description: 'Lettura richieste di acquisto: chi ha aperto il record.',
    script: `answer = false;
if (current && !current.sys_id.nil()) {
    answer = current.opened_by.toString() === gs.getUserID();
}`,
})

Acl({
    $id: Now.ID['acl_purchase_read_approver'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'read',
    active: true,
    description: 'Lettura richieste di acquisto: approvatore del record.',
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
    $id: Now.ID['acl_purchase_read_delegate'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'read',
    active: true,
    description: 'Lettura richieste di acquisto: delegato attivo di un approvatore, con approvals=true.',
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
    $id: Now.ID['acl_purchase_write'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'write',
    active: true,
    description: 'Scrittura richieste di acquisto: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_purchase_create'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'create',
    active: true,
    description: 'Creazione richieste di acquisto: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})

Acl({
    $id: Now.ID['acl_purchase_delete'],
    type: 'record',
    table: 'x_kpm95_chatdemo_purchase_req',
    operation: 'delete',
    active: true,
    description: 'Cancellazione richieste di acquisto: solo amministratori della demo.',
    roles: [chatdemoAdmin],
})
