'use server'
import { API_URL } from '@/components/Globals';
import { Album } from '@/components/Globals';


export async function patchAlbum(updatedRow: Album) {
    const formData = new FormData();
    Object.entries(updatedRow).forEach(([key, value]) => {
        const valueToAppend = value instanceof Date ? value.toISOString().slice(0, 10) : value;
        formData.append(key, valueToAppend);
    })

    const response = await fetch(`${API_URL}/albums/${updatedRow.id}`, {
        method: 'PATCH', 
        body: formData
    })

    if (response.status !== 200){
        return -1;
    }
    return 0;
}