import fetchService from '@/configs/http-service/fetch-settings';


const fetchImages = async (
    images: string[],
) => {
    try {
        images.map(async (image) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const img = await fetchService.get(`${image}`, {
                credentials: 'include',
                isClientSource: true,
				isNeedAitaAuth: true,
            });

        })
    } catch (error) {
        console.error('Error fetching answer:', error);
    }
};

export default fetchImages;
