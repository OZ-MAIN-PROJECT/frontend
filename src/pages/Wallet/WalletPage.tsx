import { sampleListData } from "@/data/wallet";
import WalletList from "./components/WalletList";

const WalletPage = () => {
    return(
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary-800">수입/지출 내역</h2>
            <WalletList
            data={sampleListData}
          />
        </div>
    )
}

export default WalletPage;