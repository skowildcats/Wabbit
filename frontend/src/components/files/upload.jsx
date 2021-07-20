import React from 'react'

export default function Upload() {
    return (
        <div>
            <form action="/api/files" method="post" encType="multipart/form-data">
                <input type="file" name="file" id="file" />
                <label htmlFor="file">Choose File</label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}