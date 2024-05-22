import frappe

@frappe.whitelist()
def get_customer_branches(customer):
    branches = frappe.get_all('Customer Branches', filters={'parent': customer}, fields=['branch'])
    return [branch['branch'] for branch in branches]
