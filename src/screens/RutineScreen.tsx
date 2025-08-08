import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Dialog, Portal, TextInput } from 'react-native-paper';

interface Routine {
  id: string;
  name: string;
  series: number;
  reps: number;
  rest: string;
}

export default function RoutineScreen() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: '1', name: 'Sentadillas', series: 4, reps: 12, rest: '1 min' },
    { id: '2', name: 'Flexiones', series: 3, reps: 15, rest: '45 seg' },
  ]);

  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<Routine>({ id: '', name: '', series: 0, reps: 0, rest: '' });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSave = () => {
    if (form.id) {
      // Editar
      setRoutines(routines.map(r => (r.id === form.id ? form : r)));
    } else {
      // Crear
      setRoutines([...routines, { ...form, id: Date.now().toString() }]);
    }
    hideDialog();
  };

  const handleDelete = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{`Series: ${item.series} - Reps: ${item.reps} - Descanso: ${item.rest}`}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => { setForm(item); showDialog(); }}>Editar</Button>
              <Button onPress={() => handleDelete(item.id)}>Eliminar</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        icon="plus"
        onPress={() => { setForm({ id: '', name: '', series: 0, reps: 0, rest: '' }); showDialog(); }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{form.id ? 'Editar rutina' : 'Nueva rutina'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Ejercicio" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} />
            <TextInput label="Series" keyboardType="numeric" value={String(form.series)} onChangeText={(text) => setForm({ ...form, series: Number(text) })} />
            <TextInput label="Reps" keyboardType="numeric" value={String(form.reps)} onChangeText={(text) => setForm({ ...form, reps: Number(text) })} />
            <TextInput label="Descanso" value={form.rest} onChangeText={(text) => setForm({ ...form, rest: text })} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={handleSave}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
