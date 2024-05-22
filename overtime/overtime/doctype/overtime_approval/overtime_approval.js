// Copyright (c) 2024, ibrahim and contributors
// For license information, please see license.txt

frappe.ui.form.on('Overtime Approval', {
    department: function(frm) {
        let departmentInput = frm.doc.department;
        // Loop through the rows in the child table and filter based on the department
        frm.fields_dict['overtime_approval_employees'].grid.get_field('employee').get_query = function() {
            return {
                filters: {
                    department: departmentInput
                }
            };
        };
    }
});

frappe.ui.form.on('Overtime Approval Employees', {
    employee: function(frm, cdt, cdn) {
        // Get the selected employee
        var employee = frappe.model.get_doc(cdt, cdn);
        
        // Fetch employee details from the server
        frappe.call({
            method: "frappe.client.get",
            args: {
                doctype: "Employee",
                name: employee.employee,
            },
            callback: function(response) {
                var emp = response.message;
                
                // Set default full name
                frappe.model.set_value(cdt, cdn, "employee_name", emp.employee_name);

                // Set default shift
                frappe.model.set_value(cdt, cdn, "default_shift", emp.default_shift);

                // Set default hours
                frappe.model.set_value(cdt, cdn, "hours", 8); // Example: set to 8 hours by default
            }
        });
    }
});


