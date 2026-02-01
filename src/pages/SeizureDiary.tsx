import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  Calendar,
  Plus,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Trash2,
  Edit3,
  Filter,
  Search,
} from 'lucide-react';
import {
  SeizureEntry,
  SeizureDiaryData,
  SeizureType,
  SEIZURE_TYPE_LABELS,
} from '../types/seizure';

// Common triggers for quick selection
const COMMON_TRIGGERS = [
  'Missed medication',
  'Lack of sleep',
  'Stress',
  'Illness/fever',
  'Flashing lights',
  'Alcohol',
  'Caffeine',
  'Hormonal changes',
  'Skipped meals',
  'Dehydration',
  'Exercise',
  'Heat',
  'Unknown',
];

// Initial empty form state
const getEmptyFormData = (): Omit<SeizureEntry, 'id' | 'createdAt' | 'updatedAt'> => ({
  date: new Date().toISOString().split('T')[0],
  time: new Date().toTimeString().slice(0, 5),
  duration: 1,
  seizureType: 'tonic-clonic',
  description: '',
  triggers: [],
  location: '',
  witnesses: [],
  emergencyMedGiven: false,
  emergencyMedType: '',
  emergencyMedDose: '',
  recoveryTime: undefined,
  ambulanceCalled: false,
  hospitalVisit: false,
  notes: '',
});

interface FormErrors {
  date?: string;
  time?: string;
  duration?: string;
  seizureType?: string;
  description?: string;
}

const SeizureDiary = () => {
  // Persisted diary data
  const [diaryData, setDiaryData] = useLocalStorage<SeizureDiaryData>(
    'epilepsy-seizure-diary',
    { entries: [] }
  );

  // UI State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(getEmptyFormData());
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<SeizureType | 'all'>('all');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [witnessInput, setWitnessInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Generate unique ID
  const generateId = () => `seizure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.duration || formData.duration < 0) {
      newErrors.duration = 'Duration must be a positive number';
    }

    if (!formData.seizureType) {
      newErrors.seizureType = 'Please select a seizure type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a brief description';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const now = new Date().toISOString();

    if (editingId) {
      // Update existing entry
      setDiaryData({
        entries: diaryData.entries.map((entry) =>
          entry.id === editingId
            ? { ...formData, id: editingId, createdAt: entry.createdAt, updatedAt: now }
            : entry
        ),
      });
      setEditingId(null);
    } else {
      // Create new entry
      const newEntry: SeizureEntry = {
        ...formData,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setDiaryData({
        entries: [newEntry, ...diaryData.entries],
      });
    }

    // Reset form
    setFormData(getEmptyFormData());
    setShowForm(false);
    setShowAdvanced(false);
  };

  // Handle edit
  const handleEdit = (entry: SeizureEntry) => {
    setFormData({
      date: entry.date,
      time: entry.time,
      duration: entry.duration,
      seizureType: entry.seizureType,
      description: entry.description,
      triggers: entry.triggers || [],
      location: entry.location || '',
      witnesses: entry.witnesses || [],
      emergencyMedGiven: entry.emergencyMedGiven || false,
      emergencyMedType: entry.emergencyMedType || '',
      emergencyMedDose: entry.emergencyMedDose || '',
      recoveryTime: entry.recoveryTime,
      ambulanceCalled: entry.ambulanceCalled || false,
      hospitalVisit: entry.hospitalVisit || false,
      notes: entry.notes || '',
    });
    setEditingId(entry.id);
    setShowForm(true);
    setShowAdvanced(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setDiaryData({
      entries: diaryData.entries.filter((entry) => entry.id !== id),
    });
    setDeleteConfirm(null);
  };

  // Handle trigger toggle
  const toggleTrigger = (trigger: string) => {
    setFormData((prev) => ({
      ...prev,
      triggers: prev.triggers?.includes(trigger)
        ? prev.triggers.filter((t) => t !== trigger)
        : [...(prev.triggers || []), trigger],
    }));
  };

  // Handle witness add
  const addWitness = () => {
    if (witnessInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        witnesses: [...(prev.witnesses || []), witnessInput.trim()],
      }));
      setWitnessInput('');
    }
  };

  // Handle witness remove
  const removeWitness = (witness: string) => {
    setFormData((prev) => ({
      ...prev,
      witnesses: prev.witnesses?.filter((w) => w !== witness) || [],
    }));
  };

  // Filter and search entries
  const filteredEntries = useMemo(() => {
    return diaryData.entries.filter((entry) => {
      const matchesSearch =
        searchTerm === '' ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || entry.seizureType === filterType;

      return matchesSearch && matchesType;
    });
  }, [diaryData.entries, searchTerm, filterType]);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 1) return 'Less than 1 minute';
    if (minutes === 1) return '1 minute';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(getEmptyFormData());
    setErrors({});
    setShowAdvanced(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
                Seizure Diary
              </h1>
              <p className="text-sm text-warm-500">
                {diaryData.entries.length} {diaryData.entries.length === 1 ? 'entry' : 'entries'} recorded
              </p>
            </div>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Log Seizure</span>
            </button>
          )}
        </div>
      </header>

      {/* Entry Form */}
      {showForm && (
        <div className="card p-6 space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-warm-900">
              {editingId ? 'Edit Seizure Entry' : 'Log New Seizure'}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg hover:bg-warm-100 transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5 text-warm-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="form-label">
                  Date <span className="text-emergency-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`form-input ${errors.date ? 'border-emergency-500 focus:ring-emergency-300' : ''}`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="text-sm text-emergency-500 mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <label htmlFor="time" className="form-label">
                  Time <span className="text-emergency-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className={`form-input ${errors.time ? 'border-emergency-500 focus:ring-emergency-300' : ''}`}
                />
                {errors.time && (
                  <p className="text-sm text-emergency-500 mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Seizure Type */}
            <div>
              <label htmlFor="seizureType" className="form-label">
                Seizure Type <span className="text-emergency-500">*</span>
              </label>
              <select
                id="seizureType"
                value={formData.seizureType}
                onChange={(e) =>
                  setFormData({ ...formData, seizureType: e.target.value as SeizureType })
                }
                className={`form-input ${errors.seizureType ? 'border-emergency-500 focus:ring-emergency-300' : ''}`}
              >
                {Object.entries(SEIZURE_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.seizureType && (
                <p className="text-sm text-emergency-500 mt-1">{errors.seizureType}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="form-label">
                Duration (minutes) <span className="text-emergency-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: parseFloat(e.target.value) || 0 })
                  }
                  min="0"
                  step="0.5"
                  className={`form-input w-32 ${errors.duration ? 'border-emergency-500 focus:ring-emergency-300' : ''}`}
                />
                <div className="flex gap-2">
                  {[1, 2, 5, 10].map((min) => (
                    <button
                      key={min}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: min })}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        formData.duration === min
                          ? 'bg-primary-500 text-white'
                          : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      }`}
                    >
                      {min}m
                    </button>
                  ))}
                </div>
              </div>
              {errors.duration && (
                <p className="text-sm text-emergency-500 mt-1">{errors.duration}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="form-label">
                What happened? <span className="text-emergency-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Describe what you observed during the seizure..."
                className={`form-input resize-none ${errors.description ? 'border-emergency-500 focus:ring-emergency-300' : ''}`}
              />
              {errors.description && (
                <p className="text-sm text-emergency-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Triggers */}
            <div>
              <label className="form-label">Possible Triggers</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_TRIGGERS.map((trigger) => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => toggleTrigger(trigger)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      formData.triggers?.includes(trigger)
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Home, School, Park..."
                className="form-input"
              />
            </div>

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              {showAdvanced ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
              {showAdvanced ? 'Hide' : 'Show'} Additional Details
            </button>

            {/* Advanced Fields */}
            {showAdvanced && (
              <div className="space-y-6 pt-4 border-t border-warm-200">
                {/* Witnesses */}
                <div>
                  <label className="form-label">Witnesses</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={witnessInput}
                      onChange={(e) => setWitnessInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWitness())}
                      placeholder="Add witness name..."
                      className="form-input flex-1"
                    />
                    <button
                      type="button"
                      onClick={addWitness}
                      className="btn-secondary"
                    >
                      Add
                    </button>
                  </div>
                  {formData.witnesses && formData.witnesses.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.witnesses.map((witness) => (
                        <span
                          key={witness}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-sm"
                        >
                          {witness}
                          <button
                            type="button"
                            onClick={() => removeWitness(witness)}
                            className="hover:text-emergency-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Emergency Medication */}
                <div className="card bg-emergency-50 border-emergency-200 p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-emergency-500" />
                    <span className="font-semibold text-warm-900">Emergency Medication</span>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.emergencyMedGiven}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyMedGiven: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-warm-700">Emergency medication was given</span>
                  </label>

                  {formData.emergencyMedGiven && (
                    <div className="grid md:grid-cols-2 gap-4 pl-8">
                      <div>
                        <label htmlFor="emergencyMedType" className="form-label">
                          Medication Type
                        </label>
                        <input
                          type="text"
                          id="emergencyMedType"
                          value={formData.emergencyMedType}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyMedType: e.target.value })
                          }
                          placeholder="e.g., Midazolam, Diazepam..."
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="emergencyMedDose" className="form-label">
                          Dose Given
                        </label>
                        <input
                          type="text"
                          id="emergencyMedDose"
                          value={formData.emergencyMedDose}
                          onChange={(e) =>
                            setFormData({ ...formData, emergencyMedDose: e.target.value })
                          }
                          placeholder="e.g., 5mg, 10mg..."
                          className="form-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Recovery Time */}
                <div>
                  <label htmlFor="recoveryTime" className="form-label">
                    Recovery Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="recoveryTime"
                    value={formData.recoveryTime || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recoveryTime: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    min="0"
                    placeholder="Time until fully alert..."
                    className="form-input w-48"
                  />
                </div>

                {/* Emergency Services */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ambulanceCalled}
                      onChange={(e) =>
                        setFormData({ ...formData, ambulanceCalled: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-warm-700">Ambulance was called</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hospitalVisit}
                      onChange={(e) =>
                        setFormData({ ...formData, hospitalVisit: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-warm-700">Hospital visit required</span>
                  </label>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="form-label">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Any other observations or information..."
                    className="form-input resize-none"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary flex-1">
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      {diaryData.entries.length > 0 && !showForm && (
        <div className="card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entries..."
                className="form-input pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-warm-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as SeizureType | 'all')}
                className="form-input w-auto"
              >
                <option value="all">All Types</option>
                {Object.entries(SEIZURE_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Entry List */}
      {diaryData.entries.length === 0 ? (
        <div className="card p-8 text-center">
          <Calendar className="w-16 h-16 mx-auto text-warm-300 mb-4" />
          <h2 className="text-xl font-bold text-warm-900 mb-2">No Entries Yet</h2>
          <p className="text-warm-600 mb-6">
            Start tracking seizures to identify patterns and share information with your healthcare team.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Log Your First Seizure
          </button>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="card p-8 text-center">
          <Search className="w-16 h-16 mx-auto text-warm-300 mb-4" />
          <h2 className="text-xl font-bold text-warm-900 mb-2">No Matching Entries</h2>
          <p className="text-warm-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="card overflow-hidden">
              {/* Entry Header */}
              <div
                className="p-4 cursor-pointer hover:bg-warm-50 transition-colors"
                onClick={() =>
                  setExpandedEntry(expandedEntry === entry.id ? null : entry.id)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-warm-900">
                        {formatDate(entry.date)}
                      </span>
                      <span className="text-warm-500">at</span>
                      <span className="font-medium text-warm-700">{entry.time}</span>
                      {entry.hospitalVisit && (
                        <span className="px-2 py-0.5 bg-emergency-100 text-emergency-700 text-xs font-medium rounded-full">
                          Hospital
                        </span>
                      )}
                      {entry.emergencyMedGiven && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          Emergency Med
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 font-medium rounded">
                        {SEIZURE_TYPE_LABELS[entry.seizureType]}
                      </span>
                      <span className="flex items-center gap-1 text-warm-500">
                        <Clock className="w-4 h-4" />
                        {formatDuration(entry.duration)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(entry);
                      }}
                      className="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-500 hover:text-primary-600"
                      aria-label="Edit entry"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(entry.id);
                      }}
                      className="p-2 rounded-lg hover:bg-warm-100 transition-colors text-warm-500 hover:text-emergency-600"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedEntry === entry.id ? (
                      <ChevronUp className="w-5 h-5 text-warm-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-warm-400" />
                    )}
                  </div>
                </div>

                {/* Brief Description */}
                <p className="mt-2 text-sm text-warm-600 line-clamp-2">
                  {entry.description}
                </p>
              </div>

              {/* Expanded Details */}
              {expandedEntry === entry.id && (
                <div className="px-4 pb-4 pt-2 border-t border-warm-100 space-y-4 animate-fade-in">
                  {/* Full Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-warm-700 mb-1">Description</h4>
                    <p className="text-warm-600">{entry.description}</p>
                  </div>

                  {/* Location */}
                  {entry.location && (
                    <div>
                      <h4 className="text-sm font-semibold text-warm-700 mb-1">Location</h4>
                      <p className="text-warm-600">{entry.location}</p>
                    </div>
                  )}

                  {/* Triggers */}
                  {entry.triggers && entry.triggers.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-warm-700 mb-2">Possible Triggers</h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.triggers.map((trigger) => (
                          <span
                            key={trigger}
                            className="px-2 py-1 bg-warm-100 text-warm-700 text-sm rounded-full"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Witnesses */}
                  {entry.witnesses && entry.witnesses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-warm-700 mb-1">Witnesses</h4>
                      <p className="text-warm-600">{entry.witnesses.join(', ')}</p>
                    </div>
                  )}

                  {/* Emergency Medication */}
                  {entry.emergencyMedGiven && (
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">
                        Emergency Medication Given
                      </h4>
                      <p className="text-amber-700 text-sm">
                        {entry.emergencyMedType || 'Type not specified'}
                        {entry.emergencyMedDose && ` - ${entry.emergencyMedDose}`}
                      </p>
                    </div>
                  )}

                  {/* Recovery & Services */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {entry.recoveryTime && (
                      <div>
                        <span className="text-warm-500">Recovery Time</span>
                        <p className="font-medium text-warm-700">
                          {formatDuration(entry.recoveryTime)}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-warm-500">Ambulance Called</span>
                      <p className="font-medium text-warm-700">
                        {entry.ambulanceCalled ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <span className="text-warm-500">Hospital Visit</span>
                      <p className="font-medium text-warm-700">
                        {entry.hospitalVisit ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {entry.notes && (
                    <div>
                      <h4 className="text-sm font-semibold text-warm-700 mb-1">Additional Notes</h4>
                      <p className="text-warm-600">{entry.notes}</p>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="text-xs text-warm-400 pt-2 border-t border-warm-100">
                    Created: {new Date(entry.createdAt).toLocaleString()}
                    {entry.updatedAt !== entry.createdAt && (
                      <span className="ml-4">
                        Updated: {new Date(entry.updatedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Delete Confirmation */}
              {deleteConfirm === entry.id && (
                <div className="p-4 bg-emergency-50 border-t border-emergency-200 flex items-center justify-between">
                  <span className="text-sm text-emergency-700">
                    Are you sure you want to delete this entry?
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-3 py-1.5 bg-emergency-500 text-white text-sm font-medium rounded-lg hover:bg-emergency-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 bg-white text-warm-700 text-sm font-medium rounded-lg border border-warm-200 hover:bg-warm-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tips Card */}
      {diaryData.entries.length > 0 && !showForm && (
        <div className="card bg-accent-50 border-accent-200 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-warm-900 mb-1">Tracking Tip</h3>
              <p className="text-sm text-warm-700">
                Recording details like triggers and recovery time helps your healthcare team identify patterns and adjust your treatment plan. Try to log entries as soon as possible after a seizure for the most accurate information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeizureDiary;
