import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const styles = {
  tableRow: `text-white border-b border-gray-800 text-[0.93rem]`,
}

const CMCtableRow = ({
  index,
  code,
  image,
  name,
  currentBid,
  completedYear,
  startedYear,
  handleClick
}) => {
  return (
    <tbody className={styles.tableRow}>
      <tr>
        <td className='text-center mb-2'>{index}</td>
        <td className='text-center mb-2'>{code.slice(0,5)}</td>
        <td className='flex justify-center mb-2'>
          <img src={image} width={27} height={27} alt='' style={{height: '30px'}} />
        </td>
        <td className='text-left mb-2'>{name}</td>
        <td className='text-left mb-2'>{currentBid}</td>
        <td className='text-center mb-2'>{completedYear}</td>
        <td className='text-center mb-2'>{startedYear}</td>
        <td className='text-center mb-2'>
          <IconButton onClick={handleClick({
            vertical: 'top',
            horizontal: 'right',
          }, code)}>
            <EditIcon />
          </IconButton>
        </td>
      </tr>
    </tbody>
  )
}

export default CMCtableRow
