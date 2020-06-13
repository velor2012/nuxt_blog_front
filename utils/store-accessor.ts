import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import MyStore from '~/store/mystore'

let mystore: MyStore

function initialiseStores(store: Store<any>): void {
    mystore = getModule(MyStore, store)
}

export { initialiseStores, mystore }