frappe.ui.form.on('Customer', {
    refresh: function(frm) {
        if (frm.doc.has_branch == 1) {
            // Perform actions when has_branch is 1
            console.log("This customer has a branch.");
            // Example: Make a field visible
            frm.set_df_property('customer_branch', 'hidden', 1);
        } else {
            // Perform actions when has_branch is not 1
            console.log("This customer does not have a branch.");
            // Example: Hide a field
            frm.set_df_property('customer_branch', 'hidden', 0);
        }
    }
});