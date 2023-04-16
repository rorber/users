interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: AddressGeo
}

interface AddressGeo {
  lat: string
  lng: string
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  address: Address
  company: Company
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}