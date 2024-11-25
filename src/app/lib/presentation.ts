export async function fetchPresentations() {
    return {
        "success": true,
        "status": 200,
        "message": "Success",
        "data": {
            "meta": {
                "perPage": 5,
                "currentPage": 1,
                "lastPage": 1,
                "total": 3
            },
            "items": [
                {
                    "id": "95b0f26e-df72-4a3a-9186-594e75384fcb",
                    "name": "Test Presentation",
                    "thumbnailImage": null,
                    "status": true,
                    "createdAt": "2024-11-21T15:53:46.424Z",
                    "updatedAt": "2024-11-21T16:00:16.328Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                },
                {
                    "id": "9996b8bb-005e-4c5b-b330-8115c38dff30",
                    "name": "Edited Presentation Name",
                    "thumbnailImage": null,
                    "status": true,
                    "createdAt": "2024-11-21T13:42:01.777Z",
                    "updatedAt": "2024-11-21T15:13:21.621Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                },
                {
                    "id": "ecb50e69-b998-43cf-b3d5-0b300aea614a",
                    "name": "Test Presentation 2",
                    "thumbnailImage": "https://www.teamsli.de/wp-content/uploads/2016/06/bigstock-Businesswoman-Presenting-Finan-308463130.jpg",
                    "status": true,
                    "createdAt": "2024-11-21T11:48:58.223Z",
                    "updatedAt": "2024-11-21T11:51:03.214Z",
                    "deletedAt": null,
                    "User": {
                        "firstName": "test",
                        "lastName": "user",
                        "email": "test_user@example.com",
                        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJjE8yzVc7WmHzo22TuZwaccsTulC5ot32V1s3Nt4MeE97O9w=s83-c-mo",
                        "createdAt": "2024-11-21T10:59:58.023Z"
                    }
                }
            ]
        },
        "errors": null,
        "date": "2024-11-22T20:01:39.410Z"
    }
}