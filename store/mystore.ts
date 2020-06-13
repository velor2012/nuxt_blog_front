import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'mystore',
  namespaced: true,
  stateFactory: true
})
export default class MyStore extends VuexModule {
    private _isMoblie = true
    private _currentType = 'article'
    private _totalAritcle = 0
    private _totalNote = 0
  @Mutation
  public setIsMoblie(val: boolean) {
    this._isMoblie = val
  }
  @Mutation
  public setCurrentType(val: string) {
    this._currentType = val
  }
  @Mutation
  public setTotalAritcle(val: number) {
    this._totalAritcle = val
    }  
    @Mutation
    public setTotalNote(val: number) {
        this._totalNote = val
      }  
  get isMoblie() {
    return this._isMoblie
  }
  get currentType() {
    return this._currentType
  }
    get totalAritcle() { 
        return this._totalAritcle
    }
    get totalNote() { 
        return this._totalNote
    }
}
