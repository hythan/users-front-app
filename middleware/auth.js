export default (context) => {
  if (!context.route.path.includes('users') || context.store.state.token !== '' ) {
    return;
  }
  return context.redirect('/login')
}
