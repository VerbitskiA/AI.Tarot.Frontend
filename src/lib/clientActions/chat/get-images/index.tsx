import fetchService from '@/configs/http-service/fetch-settings';


const fetchImages = async (
    images: string[],
) => {
    try {
        images.map(async (image) => {
            const img = await fetchService.get(`${image}`, {
                credentials: 'include',
                isClientSource: true,
            });

        })
    } catch (error) {
        console.error('Error fetching answer:', error);
    }
};

export default fetchImages;
