export default function({ store, redirect }) {
    if (!store.state.authorization.isLoggedIn) {
        return redirect('/');
    }
}
