import React from 'react'

export default function Upload() {
    return (
        <div>
            <input type="file" name="file" id="file" />
            <label htmlFor="file">Choose File</label>
        </div>
    )
}