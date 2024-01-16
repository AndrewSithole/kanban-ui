abstract class BaseRepository<T, BaseRepositoryParams> {
    constructor() {
    }
    abstract call(params: BaseRepositoryParams):Promise<T>;
}
abstract class BaseRepositoryParams {
}
export {BaseRepository, BaseRepositoryParams}
