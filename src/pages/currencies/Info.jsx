import CMCpriceConverter from '../../components/PriceConverter'
import Header from '../../components/Header'
import solana from '../../assets/solana.png'
import Usd from '../../assets/svg/usd'
import { useEffect, useState } from 'react'
import Graph from '../../components/Graph'
import Chat from '../../components/Chat'
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import { ethers } from 'ethers';
import axios from 'axios';

const styles = {
  activeTab: `p-1 px-2 mr-2 rounded-lg bg-[#171924]`,
  tabItem: `px-2`,
  tabContainer: `flex items-center p-2 rounded-xl bg-[#222531] border border-gray-500/10 text-sm`,
  info: `min-h-screen`,
  main: `text-white mx-auto max-w-screen-2xl`,
  flexStart: `flex items-start`,
  flexBetween: `flex justify-between`,
  flexBetweenCenter: `flex justify-between items-center`,
  tabContainerWrapper: `p-10 pl-0 pr-0 w-2/3`,
  flexCenter: `flex items-center`,
}

const Currencies = () => {
  const toAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const priceAccount = 0;
  const [coinName, setCoinName] = useState('')
  const [coinSymbol, setCoinSymbol] = useState('')
  const [price, setPrice] = useState('')
  const [usdPrice, setUsdPrice] = useState(0);

  useEffect(() => {
    getData();
    getPrice();
  }, [])

  const getData = async () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    setCoinName(urlParams.get('coin'))
    setPrice(Number(urlParams.get('price')).toLocaleString())
    setCoinSymbol(urlParams.get('symbol'))
  }

  const getPrice = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/ethtoken`);
    setUsdPrice(response.data.usdPrice.toFixed(2));
  }

  const onBuy = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const tx = signer.sendTransaction({
        to: toAddress,
        value: ethers.utils.parseEther((priceAccount / usdPrice).toString()),
      });
      console.log(tx)
  }

  return (
    <div className={styles.info}>
      <Header />
      <main className={styles.main}>
        <div className={styles.flexStart}>
          <div className={styles.tabContainerWrapper}>
            <div className={styles.flexBetween}>
              <div className={styles.tabContainer}>
                <p className={styles.activeTab}>Price</p>
                <p className={styles.tabItem}>Trading View</p>
                <p className={styles.tabItem}>History</p>
              </div>

              <div className={styles.tabContainer}>
                <p className={styles.activeTab}>1D</p>
                <p className={styles.tabItem}>2D</p>
                <p className={styles.tabItem}>1M</p>
                <p className={styles.tabItem}>3M</p>
                <p className={styles.tabItem}>1Y</p>
                <p className={styles.tabItem}>YTD</p>
                <p className={styles.tabItem}>ALL</p>
                <p className={styles.tabItem}>LOG</p>
              </div>
            </div>
            <br />
            {/* <Graph /> */}
            <div className='flex gap-20'>
              <img
                className="w-1/2 object-cover"
                src="https://media.cnn.com/api/v1/images/stellar/prod/131107152744-mona-lisa.jpg?q=w_2000,h_3000,x_0,y_0,c_fill"
                alt=""
              />
              <div>
                <div className='flex justify-between items-center'>
                  <div className='text-2xl font-bold'>
                    <div>Mona Lisa</div>
                    <Rating name="read-only" value="5" readOnly />
                  </div>
                  <div>
                    <button className='bg-[#6188FF] px-5 py-2 rounded-lg' onClick={onBuy}>Buy</button>
                  </div>
                </div>
                <Divider className='text-white'/>
                <div className='mt-3'>
                  <div className='flex justify-between items-center'>
                    <div className='text-2xl text-slate-950 font-bold'>$18901.34</div>
                    <div>
                      <div>Chủ sở hữu: Adam</div>
                      <div className='flex items-center h-8'>
                        <div>
                          <img className='rounded-full flex-shrink-0 mr-3' width={24} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA8NJREFUeF7t3bFtFUEUheHZDujABUABdILkAOfkboICiB1ZohNnJCA5Q3RARvgQEhW8b6Wr0fud3327Z87+587sePd4fXi8LPi7e/sJqtf69eML1e9ePK3fkQFmLZQBIgA5UAkaAUh+L44AEYBcFAFIvvniCBAByIURgOSbL44AEYBcGAFIvvniCBAByIURgOSbL44AEYBcGAFIvvniCBAByIURgOSbLx4nwJ/PP2k/gEr49ftvOsT745nqtfjlck+H+PDuDdVr8ZEBTMIMYPqtCBAByEJFAMm3igDTbxUBKGARUASQhYoAkq8IMPlWEaACFgFFAHmoCCD5igCTrwhQ/VoIaim4ZwF8F8EBWggC8f6VthCEAjYLaBZAFmoWQPLNzwJ0R4td/ny1bgjRKxjvATKAvWAjA6gCw/URoE2hoxYsAkblXysCRIBRC0aAUfkjQK+Jw9fsqX8jgCqI9fUA9QBoISuPAKYfV0eACMAmkgNEAFHvhNoIEAFOsNH1h4gA12t3SmUEiACnGOnagxxPH7/R+wH0/9v1cfD0HTR9/rqjKgNce+v8r8sAuK15WkAcf17KVoJFgOG19GkDZ4AMQBCrByD5/KNXRQBOA1VAHP96gKaB9tk7NXA9QD0AQawegOSrB1hFQBFA99D0PJpOfkWACDA8i6kJrAkkiNUEknxFQBGwewTo6+K1icMbcPx/63a/ft4StrsAasDdrz8DoAMyAGYg6l8E4CwoAqADI0AEQAtZuT5NjACmP+8HwJ/nCMwAOAJFQBGAFrLyIgC7YJPfl4L19zNABiAP1QOQfBFg+y4Yx3/7648A6IBmAc0C0EJWXhNYE0gO4h1B9OtrLf3gg94Bev4aAfrJGT3/DIAKZgAUMALco4JWHgFMP54GFgHHMw1BPQDJtyKA6RcBUL9mAZd6APJQEUDyFQEmnz8MqgmsCVQPUn1NIMkXAVC+loKLgCKAbyI5QBEg6p3whpAIEAHQglYeAUy//VcCXx8e6XsBqN9SBOrTxFs//yMDmAV2N3AGsPHfnmAZIAPUA4gHigBRb63tEZoBMgApMD2LqQeg4dufYBkgA9QEigfqAUS9mkDeE4nyryIAFYwANy5gBsgApEDTQNwXPy1gBCD/7z+PvnkD7C4A+pfLp/XjWcD0BfAIDB9gWr8MkAFsJXDawcPjxz8/rV8E4CG0A2QA3BZu8s9XZ4AMQC7UdZAigOT34ggQAchFEYDkmy+OABGAXBgBSL754ggQAciFEYDkmy+OABGAXBgBSL754mkC/AXs23wd8PsEegAAAABJRU5ErkJggg==' />
                        </div>
                        <div>0xd8d...6045</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider className='text-white'/>
                <div className='mt-3'>
                  <div className='text-white opacity-50'>
                    <div>Tác giả: Leonardo da Vinci</div>
                    <div>Thời gian: 1503–1506, có thể là tiếp tục cho đến năm 1517</div>
                    <div>Loại: Sơn dầu trên gỗ dương</div>
                  </div>
                </div>
                <Divider className='text-white'/>
                <div className='mt-3'>
                  <div className='text-white opacity-50'>
                  Mona Lisa (La Gioconda hay La Joconde, Chân dung Lisa Gherardini, vợ của phong del Giocondo) là một bức chân dung thế kỷ 16 được vẽ bằng chất liệu sơn dầu trên một tấm gỗ dương tại Florence bởi Leonardo da Vinci trong thời kì Phục Hưng Italia. Tác phẩm thuộc sở hữu của Chính phủ Pháp và hiện được trưng bày tại bảo tàng Louvre ở Paris, Pháp với tên gọi Chân dung Lisa Gherardini, vợ của Francesco del Giocondo. 
                  Bức tranh là một bức chân dung nửa người và thể hiện một phụ nữ có những nét thể hiện trên khuôn mặt thường được miêu tả là bí ẩn. Sự mơ hồ trong nét thể hiện của người mẫu, sự lạ thường của thành phần nửa khuôn mặt, và sự huyền ảo của các kiểu mẫu hình thức và không khí hư ảo là những tính chất mới lạ góp phần vào sức mê hoặc của bức tranh.Có lẽ nó là bức tranh nổi tiếng nhất từng bị đánh cắp và được thu hồi về bảo tàng Louvre. Ít tác phẩm nghệ thuật khác từng là chủ đề của nhiều sự chăm sóc kỹ lưỡng, nghiên cứu, thần thoại hoá và bắt chước tới như vậy.[4] Một sự nghiên cứu và vẽ thử bằng chì than và graphite về Mona Lisa được cho là của Leonardo có trong Bộ sưu tập Hyde, tại Glens Falls, NY.
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className={styles.flexBetweenCenter}>
              <div className='flex'>
                <div className={styles.flexCenter}>
                  <input className='outline-none' type='checkbox' /> &nbsp; USD
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className={styles.flexCenter}>
                  <input type='checkbox' /> &nbsp; BTC
                </div>
              </div>

              <p>
                Want more data?{' '}
                <span className='text-[#6188FF]'>Check out our API</span>
              </p>
            </div>
            <br />
            <br />
            <CMCpriceConverter
              from={coinName}
              fromSymbol={coinSymbol}
              fromLogo={solana}
              toLogo={<Usd />}
              price={price}
              to='United States Dollars'
              toSymbol='USD'
            />
          </div>

          <div className='pt-10 ml-5'>
            <Chat />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Currencies
