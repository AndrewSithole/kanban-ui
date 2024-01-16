abstract class BaseUseCase<T, BaseUseCaseParams> {
    constructor() {
    }
    abstract call(params: BaseUseCaseParams):T;
}
abstract class BaseUseCaseParams {
}
export {BaseUseCase, BaseUseCaseParams}
