import React from 'react'
import { Share, Text, View, ScrollView } from 'react-native'
import { Searchbar, Chip, Card, Icon } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';

function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const chips = [
    { text: 'Labels' },
    { text: 'From' },
    { text: 'To' },
    { text: 'Attachment' },
    { text: 'Date' },
    { text: 'Is unread' },
    { text: 'Exclude calendar updates' },
  ]

  const history = [
    { text: 'duta anti' },
    { text: 'beasiswa' },
    { text: 'career preparation' },
    { text: 'pengabdian masyarakat' },
    { text: 'krs' },
    { text: 'kalender' },
    { text: 'kidztainia' },
  ]

  return (
    <SafeAreaView style={{ backgroundColor: '#f6f9fe' }}>
      <Searchbar
        icon='keyboard-backspace'
        mode='view'
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        autoFocus={true}
        onIconPress={() => navigation.goBack()}
        clearIcon={() => (
          <Icon source="microphone" color='#3e454d' size={24} />
        )}
        onClearIconPress={() => { }}
        style={{ backgroundColor: '#e2e9f1', borderBottomColor: '#cdd3d9' }}
      />
      <ScrollView horizontal style={{ marginLeft: 8, marginTop: 8 }}>
        {chips.map((chip, index) => (
          <Chip
            key={index} // Use index as key, but consider a unique identifier if available
            mode="outlined"
            style={{ borderColor: '#edeef3', paddingBottom: 2, marginHorizontal: 4, marginTop: 8, backgroundColor: '#f6f9fe' }} // Style the Chip as needed
          >
            {chip.text}
          </Chip>
        ))}
      </ScrollView>
      <ScrollView>
        <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 12 }}>Recent email searches</Text>
        {history.map((history, index) => (
          <Card key={index} elevation={0} style={{ marginVertical: -12 }}>
            <Card.Title
              title={history.text}
              titleStyle={{ marginBottom: -5, marginLeft: -8, fontSize: 16 }}
              left={() => (
                <Icon source="clock-outline" size={18} />)}
              leftStyle={{ marginRight: 20 }}
            />
          </Card>
        ))}
        <View style={{ height: 500, backgroundColor: '#f5f8fd' }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search