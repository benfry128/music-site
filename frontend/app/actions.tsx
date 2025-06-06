'use server'
import { API_URL } from '@/components/Globals';
import { Album } from '@/components/Globals';


export async function patchAlbum(updatedRow: Album) {
    console.log(updatedRow);

    const formData = new FormData();
    Object.entries(updatedRow).forEach(([key, value]) => {
        formData.append(key, value);
    })

    const response = await fetch(`${API_URL}/albums/${updatedRow.id}`, {
        method: 'PATCH', 
        body: formData
    })
    console.log(response);

    if (response.status !== 200){
        return -1;
    }
    return 0;
}