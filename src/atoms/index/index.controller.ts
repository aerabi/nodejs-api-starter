import { Controller, Body, Get, Path, Post, Route, SuccessResponse } from 'tsoa';

@Route('')
export class IndexController extends Controller {
    @SuccessResponse("201", "Created")
    @Post('user/{userId}/msg')
    public async createMessage(@Path() userId: string, @Body() requestBody: object) {
        return { userId, body: requestBody };
    }
}
