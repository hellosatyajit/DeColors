import toast from "react-hot-toast";

export const getDiscountedPricePercentage = (
    originalPrice: number,
    discountedPrice: number
) => {
    const discount = originalPrice - discountedPrice;

    const discountPercentage = (discount / originalPrice) * 100;

    return discountPercentage.toFixed(2);
};

const shareOnFacebook = (currentUrl:string, productName: string) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=Check ${productName} from ${currentUrl}`;
    window.open(url, "_blank", "noopener,noreferrer");
};

const shareOnWhatsApp = (currentUrl:string, productName: string) => {
    const url = `https://wa.me/?text=Check ${productName} from ${currentUrl}`;
    window.open(url, "_blank", "noopener,noreferrer");
};

const copyToClipboard = (currentUrl:string) => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard!");
};

export const ShareLinks = {
    shareOnFacebook,
    shareOnWhatsApp,
    copyToClipboard,
};