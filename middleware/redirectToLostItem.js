export default async function ({store, params, redirect}) {
  const Response = await store.dispatch('lost_item/isValidQRCode', params)
  if(Response.isValid){
    console.log("一致")
    store.dispatch('lost_item/getLostItem', params.id)
    return redirect('/lost-items')
  } else {
    return redirect('/')
  }
}
