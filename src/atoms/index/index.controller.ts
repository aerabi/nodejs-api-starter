import { Body, Controller, Path, Post, Route, SuccessResponse } from 'tsoa';
import { MessageCreationRequest } from "./data/index.models";

@Route('')
export class IndexController extends Controller {
    @SuccessResponse("201", "Created")
    @Post('user/{userId}/msg')
    public async createMessage(@Path() userId: string, @Body() requestBody: MessageCreationRequest) {
        return { userId, body: requestBody };
    }
}
