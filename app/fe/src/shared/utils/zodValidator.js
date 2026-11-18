const zodValidator = (schema, field, form) => (_, value) => {
  const values = form ? { ...form.getFieldsValue(), [field]: value } : value;
  const targetSchema = form ? schema : schema.shape[field];
  const result = targetSchema.safeParse(values);
  if (!result.success) {
    const issue = result.error.issues.find(issue => !form || issue.path[0] === field);
    if (issue) return Promise.reject(new Error(issue.message));
  }
  return Promise.resolve();
}

export default zodValidator;