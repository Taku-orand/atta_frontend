export default function ({store, params, redirect}) {
  store.dispatch('lost_item/getLostItem', params.url)
  return redirect('/lost-items')
}
