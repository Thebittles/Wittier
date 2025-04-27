
export default function handler(req, res) {
    res.status(200).json([
      {
        id: 1,
        name: 'Austin Fire Station #1',
        type: 'Firestation',
        lat: 30.2711,
        lng: -97.7437
      },
      {
        id: 2,
        name: 'Downtown Police Station',
        type: 'Policestation',
        lat: 30.2676,
        lng: -97.7404
      },
      {
        id: 3,
        name: 'SAFE Alliance Shelter',
        type: 'Shelter',
        lat: 30.2905,
        lng: -97.7428
      }
    ]);
  }
  