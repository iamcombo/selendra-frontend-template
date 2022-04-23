import React from 'react'
import toast from 'react-hot-toast';
import keyring from '@polkadot/ui-keyring';
import { Button, Grid, Input } from 'semantic-ui-react'

export default function RestoreAccount() {
  const [password, setPassword] = React.useState();
  const [files, setFiles] = React.useState();

  const handleFileChosen = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  }

  async function handleRestore() {
    try {
      const json = JSON.parse(files);
      const pair = keyring.restoreAccount(json, password);
      console.log(json, pair);
      toast.success('Done!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid.Column>
      <h2>Restore Account</h2>
      <Input
        type="file"
        label="JSON File"
        accept=".json"
        onChange={handleFileChosen}
      />
      <Input 
        style={{
          margin: '8px 0',
          display: 'block',
        }} 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder='Enter Password'
      />
      <Button onClick={handleRestore}>Restore</Button>
    </Grid.Column>
  )
}
