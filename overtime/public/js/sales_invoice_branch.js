
frappe.ui.form.on('Sales Invoice', {
    customer: function(frm) {
        // Clear existing options in the Customer Branch field
        frm.set_value('customer_branch', '');
        frm.set_df_property('customer_branch', 'hidden', true); // Initially hide the field

        // Get the selected customer
        var customer = frm.doc.customer;

        // If a customer is selected
        if (customer) {
            // Fetch customer details to check the 'Has Branch' field
            frappe.db.get_value('Customer', customer, 'has_branch', function(value) {
                if (value.has_branch) {
                    // Show the customer branch field
                    frm.set_df_property('customer_branch', 'hidden', false);

                    // Fetch branches related to the selected customer
                    frappe.call({
                        method: 'overtime.custom.custom.get_customer_branches',
                        args: {
                            customer: customer
                        },
                        callback: function(response) {
                            // Log the branches to the console
                            console.log('Branches:', response.message);
                            
                            // Set a query to filter branches based on the selected customer
                            frm.set_query('customer_branch', function() {
                                return {
                                    filters: [
                                        ['branch', 'in', response.message]
                                    ]
                                };
                            });
                        }
                    });
                } else {
                    // Hide the customer branch field if 'Has Branch' is not checked
                    frm.set_df_property('customer_branch', 'hidden', true);
                }
            });
        }
    }
});
