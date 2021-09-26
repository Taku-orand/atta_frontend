export default async function ({store, params, redirect}) {
  const Response = await store.dispatch('lost_item/isValidQRCode', params)
  if(Response.isValid){
    localStorage.setItem('item_referer', params.id)
    return redirect('/lost-items')
  } else {
    return redirect('/')
  }
}